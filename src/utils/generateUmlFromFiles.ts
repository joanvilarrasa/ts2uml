import { Project, VariableDeclarationKind } from "ts-morph";

export function generateUmlFromFiles(files: string[]): string {
    const project = new Project();
    const umlLines: string[] = [];
    const relationships: string[] = []; // To store relationships between classes/interfaces

    // Helper function to simplify and transform types
    const simplifyType = (type?: string): string => {
        if(type === undefined) return "";
        // let cleanType = type.replace(/import\(["'].*\/([^"']+)["']\)\./g, '$1');
        let cleanType = type;
        // Convert array types to Mermaid-compatible syntax
        if (cleanType.endsWith('[]')) {
            cleanType = `List~${cleanType.replace('[]', '')}~`;
        }
    
        // Replace { with object~ and } with ~
        cleanType = cleanType.replace(/^\{\s*/, 'object~').replace(/\s*}$/, '~');
    
        // Trim trailing semicolons or extra whitespace
        cleanType = cleanType.trim().replace(';', '');
    
        return cleanType;
    };
    
    
    

    for (const file of files) {
        const sourceFile = project.addSourceFileAtPath(file);

        // Process Classes
        const classes = sourceFile.getClasses();
        for (const cls of classes) {
            const className = cls.getName();
            umlLines.push(`class ${className} {`);
            const properties = cls.getProperties();
            for (const prop of properties) {
                const propType = simplifyType(prop.getTypeNode()?.getText());
                umlLines.push(`  + ${prop.getName()}: ${propType}`);
            }
            const methods = cls.getMethods();
            for (const method of methods) {
                const params = method.getParameters()
                    .map((p) => `${p.getName()}: ${simplifyType(p.getType().getText())}`)
                    .join(', ');
                const returnType = simplifyType(method.getReturnTypeNode()?.getText());
                umlLines.push(`  + ${method.getName()}(${params}): ${returnType}`);
            }
            umlLines.push(`}`);
        }

        // Process Interfaces
        const interfaces = sourceFile.getInterfaces();
        for (const intf of interfaces) {
            const interfaceName = intf.getName();
            umlLines.push(`interface ${interfaceName} {`);
            const properties = intf.getProperties();
            for (const prop of properties) {
                const propType = simplifyType(prop.getTypeNode()?.getText());
                umlLines.push(`  + ${prop.getName()}: ${propType}`);

                // Add relationships for imported types
                if (propType.match(/^[A-Z][a-zA-Z0-9]*$/)) {
                    relationships.push(`${interfaceName} --> ${propType}`);
                }
            }
            umlLines.push(`}`);
        }

        // Process Enums
        const enums = sourceFile.getEnums();
        for (const enm of enums) {
            const enumName = enm.getName();
            umlLines.push(`enum ${enumName} {`);
            const members = enm.getMembers();
            for (const member of members) {
                umlLines.push(`  + ${member.getName()}`);
            }
            umlLines.push(`}`);
        }

        // Process Functions
        const functions = sourceFile.getFunctions();
        for (const func of functions) {
            const funcName = func.getName();
            const params = func.getParameters()
                .map((p) => `${p.getName()}: ${simplifyType(p.getTypeNode()?.getText())}`)
                .join(', ');
            const returnType = simplifyType(func.getReturnType().getText());
            umlLines.push(`function ${funcName}(${params}): ${returnType}`);
        }

        // Process Types
        const typeAliases = sourceFile.getTypeAliases();
        for (const typeAlias of typeAliases) {
            const typeName = typeAlias.getName();
            const aliasedType = simplifyType(typeAlias.getTypeNode()?.getText());
            umlLines.push(`type ${typeName} = ${aliasedType}`);
        }

        // Process Consts
        const variableStatements = sourceFile.getVariableStatements();
        for (const variableStatement of variableStatements) {
            const declarations = variableStatement.getDeclarations();
            if (variableStatement.getDeclarationKind() === VariableDeclarationKind.Const) {
                for (const declaration of declarations) {
                    const type = declaration.getType();
                    const name = declaration.getName();
                    if (type.getCallSignatures().length > 0) {
                        // This const is a function
                        const params = type.getCallSignatures()[0].getParameters()
                            .map((param) => `${param.getName()}: ${simplifyType(param.getTypeAtLocation(declaration).getText())}`)
                            .join(', ');
                        const returnType = simplifyType(type.getCallSignatures()[0].getReturnType()?.getText());
                        umlLines.push(`function ${name}(${params}): ${returnType}`);
                    } else {
                        // Regular const
                        const constType = simplifyType(declaration.getTypeNode()?.getText());
                        umlLines.push(`const ${name}: ${constType}`);
                    }
                }
            }
        }
    }

    // Add relationships at the end of the file
    umlLines.push(...relationships);

    return umlLines.join('\n');
}
