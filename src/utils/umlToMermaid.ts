export function umlToMermaid(umlText: string): string {
    const lines = umlText.split('\n');
    const mermaidLines: string[] = ['classDiagram'];
    const classRelationships: string[] = [];
    let currentClassName: string | null = null;

    lines.forEach((line) => {
        line = line.trim();

        if (line.startsWith('interface ') || line.startsWith('class ')) {
            // Start of a class or interface
            const [, className] = line.split(' ');
            currentClassName = className;
            mermaidLines.push(`class ${className} {`);
            if (line.startsWith('interface')) {
                // mermaidLines.push('    &lt;&lt;interface&gt;&gt;');
                mermaidLines.push('    <<interface>>');
            }
        } else if (line.startsWith('+')) {
            // Process properties
            let property = line.replace('+', '').trim();
            let splittedProperty = property.split(':').map((s) => s.trim());
            mermaidLines.push(`    + ${splittedProperty[0]}: ${splittedProperty.splice(1).join(':')}`);
        } else if (line.startsWith('function ')) {
            // Process functions (ignore for now, can be added as separate entities if needed)
        } else if (line.startsWith('type ')) {
            // Process type aliases (ignore for now, can be added as separate entities if needed)
        } else if (line.startsWith('const ')) {
            // Process constants (ignore for now, can be added as separate entities if needed)
        } else if (line.includes('-->')) {
            // Process relationships
            classRelationships.push(line);
        } else if (line === '}') {
            // End of a class or interface
            if (currentClassName) {
                mermaidLines.push('}');
                currentClassName = null;
            }
        }
    });

    // Add relationships to the diagram
    mermaidLines.push(...classRelationships);

    return mermaidLines.join('\n');
}

