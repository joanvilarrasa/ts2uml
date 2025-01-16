import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

interface ModelInfo {
    name: string;
    description: string;
    category: "Config" | "Graph" | "Defaults";
}

function extractJSDocDescription(content: string, interfaceName: string): string {
    const regex = new RegExp(`\\/\\*\\*([^*]|\\*(?!\\/))*\\*\\/\\s*export\\s*(type|interface)\\s*${interfaceName}`);
    const match = content.match(regex);
    if (!match) return "";

    const jsdoc = match[0].match(/\/\*\*(.*?)\*\//s);
    if (!jsdoc) return "";

    return jsdoc[1]
        .split('\n')
        .map(line => line.trim().replace(/^\*\s*/, ''))
        .filter(line => line && !line.startsWith('@'))
        .join(' ')
        .trim();
}

function getModelInfo(): ModelInfo[] {
    const models: ModelInfo[] = [];
    
    // Config Models
    const configDir = join(__dirname, "../src/config");
    readdirSync(configDir).forEach(file => {
        if (!file.endsWith('.ts')) return;
        const content = readFileSync(join(configDir, file), 'utf-8');
        const name = file.replace('.ts', '');
        models.push({
            name,
            description: extractJSDocDescription(content, name),
            category: "Config"
        });
    });

    // Graph Models
    const graphDir = join(__dirname, "../src/graph");
    readdirSync(graphDir).forEach(file => {
        if (!file.endsWith('.ts')) return;
        const content = readFileSync(join(graphDir, file), 'utf-8');
        const name = file.replace('.ts', '');
        models.push({
            name,
            description: extractJSDocDescription(content, name),
            category: "Graph"
        });
    });

    // Default exports
    const defaultsDir = join(__dirname, "../src/defaults");
    readdirSync(defaultsDir).forEach(file => {
        if (!file.endsWith('.ts')) return;
        const content = readFileSync(join(defaultsDir, file), 'utf-8');
        const exportMatches = content.match(/export const ([A-Z_]+)/g) || [];
        exportMatches.forEach(match => {
            const name = match.replace('export const ', '');
            models.push({
                name,
                description: extractJSDocDescription(content, name) || "Default styling configuration",
                category: "Defaults"
            });
        });
    });

    return models;
}

function generateModelSection(models: ModelInfo[]): string {
    let section = '## Available Models\n\n';

    // Config Models
    section += '### Config Models\n';
    models
        .filter(m => m.category === "Config")
        .forEach(m => {
            section += `- \`${m.name}\` - ${m.description}\n`;
        });
    section += '\n';

    // Graph Models
    section += '### Graph Models\n';
    models
        .filter(m => m.category === "Graph")
        .forEach(m => {
            section += `- \`${m.name}\` - ${m.description}\n`;
        });
    section += '\n';

    // Defaults
    section += '### Defaults\n';
    models
        .filter(m => m.category === "Defaults")
        .forEach(m => {
            section += `- \`${m.name}\` - ${m.description}\n`;
        });
    section += '\n';

    return section;
}

function updateReadme() {
    const readmePath = join(__dirname, "../README.md");
    const readme = readFileSync(readmePath, 'utf-8');

    // Get model information
    const models = getModelInfo();
    const newModelSection = generateModelSection(models);

    // Split the readme into sections
    const sections = readme.split(/(?=##\s+[A-Za-z])/);
    
    // Find the indices of the key sections
    const modelSectionIndex = sections.findIndex(section => section.startsWith('## Available Models'));
    const usageSectionIndex = sections.findIndex(section => section.startsWith('## Usage'));
    
    if (modelSectionIndex !== -1) {
        // Replace the old models section with the new one
        sections[modelSectionIndex] = newModelSection;
        
        // Remove any duplicate models sections that might follow
        sections.splice(modelSectionIndex + 1, sections.length - modelSectionIndex - 1);
        
        // Join the sections back together
        const updatedReadme = sections.join('');
        writeFileSync(readmePath, updatedReadme);
    } else if (usageSectionIndex !== -1) {
        // Insert models section after usage
        sections.splice(usageSectionIndex + 1, 0, newModelSection);
        const updatedReadme = sections.join('');
        writeFileSync(readmePath, updatedReadme);
    } else {
        // If neither section exists, append models to the end
        writeFileSync(readmePath, readme + '\n' + newModelSection);
    }
}

updateReadme(); 