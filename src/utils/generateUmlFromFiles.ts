import { Project, VariableDeclarationKind } from "ts-morph";

export function generateUmlFromFiles(files: string[]): string {
    const project = new Project();
    const umlLines: string[] = [];

    for (const file of files) {
        const sourceFile = project.addSourceFileAtPath(file);

        // Process Classes
        const classes = sourceFile.getClasses();
        for (const cls of classes) {
            const className = cls.getName();
            umlLines.push(`class ${className} {`);
            const properties = cls.getProperties();
            for (const prop of properties) {
                umlLines.push(`  + ${prop.getName()}: ${prop.getType().getText()}`);
            }
            const methods = cls.getMethods();
            for (const method of methods) {
                const params = method.getParameters().map((p) => `${p.getName()}: ${p.getType().getText()}`).join(', ');
                umlLines.push(`  + ${method.getName()}(${params}): ${method.getReturnType().getText()}`);
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
                umlLines.push(`  + ${prop.getName()}: ${prop.getType().getText()}`);
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
            const params = func.getParameters().map((p) => `${p.getName()}: ${p.getType().getText()}`).join(', ');
            umlLines.push(`function ${funcName}(${params}): ${func.getReturnType().getText()}`);
        }

        // Process Types
        const typeAliases = sourceFile.getTypeAliases();
        for (const typeAlias of typeAliases) {
            const typeName = typeAlias.getName();
            umlLines.push(`type ${typeName} = ${typeAlias.getType().getText()}`);
        }

        // Process Consts
        const variableStatements = sourceFile.getVariableStatements();
        for (const variableStatement of variableStatements) {
            const declarations = variableStatement.getDeclarations();
            if(variableStatement.getDeclarationKind() === VariableDeclarationKind.Const) {
                for (const declaration of declarations) {
                    const type = declaration.getType();
                    const name = declaration.getName();
                    if (type.getCallSignatures().length > 0) {
                        // This const is a function
                        const params = type
                            .getCallSignatures()[0]
                            .getParameters()
                            .map((param) => `${param.getName()}: ${param.getTypeAtLocation(declaration).getText()}`)
                            .join(', ');

                        const returnType = type.getCallSignatures()[0].getReturnType().getText();
                        umlLines.push(`function ${name}(${params}): ${returnType}`);
                    } else {
                        // Regular const
                        umlLines.push(`const ${name}: ${type.getText()}`);
                    }
                }
            }
        }
    }

    return umlLines.join('\n');
}
