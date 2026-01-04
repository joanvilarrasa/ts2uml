# ts2uml 🎨

# ⚠️ I am abandoning this project to go work on other things. I am also shutting down the server so the sharing functionality will no longer work. ⚠️

Below is the readme as it was when the project was active.

----

Hey! 👋 This is **ts2uml** - a tool that turns your TypeScript code into pretty UML diagrams. 
See it in the marketplace [here](https://marketplace.visualstudio.com/items?itemName=jvilarrasa.ts2uml)

⚠️ Please keep in mind that this is a passion project and is still in early development. Expect bugs and unintended behaviors.

## 💡 The idea

One of the usual flows when building software is to create diagrams of the types and then code them. This leads to:
- Having to maintain both the diagram and the code (no one does this for an extended period of time).
- Or deprecating the diagram as soon as you have to modify the original idea (which always happens).

The idea for this project is to give you a tool that generates a diagram form your code so that you can:
- Start by coding and only maintain the code
- Whenever you need a diagram to think about the structure or onboard a new member just generate it!

### 🤔 Why did I build this?

I was working on this codebase at my job. It was not overly complex but it had a lot of types. I like having things typed but there comes a point where you have diminishing returns. This project was way past that point.

I looked around for tools to help me turn the code into a UML diagram so that I maybe could understand something, but everything I found was either too clunky or missing features I really wanted, like being able to filter out the types by folder or by type (interface, class, enum, etc.). 

So I decided to build my own and that's how **ts2uml** was born! 

## 📖 Overview

**ts2uml** is primarily a vscode extension that allows you to generate UML diagrams from your TypeScript code.
- It uses [React Flow](https://reactflow.dev/) to render the diagram.
- It uses [ts-morph](https://ts-morph.com/) to read the code and extract the types.
- It uses [elk.js](https://github.com/kieler/elkjs) to layout the diagram.

### ⚠️ Some notes on the scope and vision for the project:
- I have alwasy worked on small teams and companies. Diagrams and UML is cool but no one has time to maintain both the diagram and the code.
  - This project is meant as a way to generate diagrams rfom the code so that you only have to maintain the code
  - I will try to come up with automations and helpful features in that direction.

- ts2uml is not a meant for very complex typing structures. If you have several levels of inheritance, heavy use of Partial, Omit, extends, unions, intersections, etc., this tool will probably fall short.
  - I strongly believe that types in typescript should be kept as simple as posible.
  - If you have very complex types, God save your soul.

# 🚀 Getting Started
To generate a UML diagram:
1. Install the VS Code extension [ts2uml](https://marketplace.visualstudio.com/items?itemName=jvilarrasa.ts2uml)
2. Right-click any folder with TypeScript files and hit "Generate UML diagram"
3. Customize the diagram as you want
4. Share or save your work!

## ✨ Features

### 🎯 Generate UML Diagrams
Just right-click a folder in VS Code, hit "Generate UML diagram" and boom! You get this interactive diagram built with React Flow. You can drag stuff around and make it look exactly how you want.

Thanks to [React Flow](https://reactflow.dev/) you can:
  - Drag and drop things around
  - Zoom in and out
  - Pan around

### 🔍 Filter Out the Noise
Got too many types cluttering your view? No worries! You can:
- ✅ Hide nodes from specific folders or files
- ✅ Hide nodes by name (starts with, ends with or includes)
- ✅ Hide nodes by folder, file or node
- ✅ Hide nodes by type

### 🎨 Configure the graph
Thanks to [elk.js](https://github.com/kieler/elkjs) and [React Flow](https://reactflow.dev/) you can configure how the graph looks!
- ✅ Change the layout algorithm (from elk.js): 'layered', 'mrtree', 'force', 'radial', 'box', 'random'
- ✅ Change the type of links (from React Flow): 'straight', 'bezier', 'step'

### 🌐 Share with anyone
This is very useful for onboarding new people or when you want to share the diagram with someone who doesn't have VS Code or the extension installed.
- ✅ Click on the share button and generate a link that works for 24 hours. The link will open the [ts2uml.com](https://ts2uml.com) website and will show the diagram as you had it when you generated the link

### 💾 Save Your Work
Don't lose your masterpiece:
- ✅ Save as PNG (with or without background)
- ✅ Save as JSON, you'll be able to import it again (also you'll see the structure of the diagram)
- ✅ Copy to clipboard for quick sharing
- ✅ Import saved diagrams when you need them

###  Generate docs
Don't lose your masterpiece:
- ✅ Generate a markdown documentation of your types based on the jsdocs insied the code
- ✅ Optionally show a table with the attributes for each interface and class (methods coming soon)

### 🔍 Explore the code (extension only)
- ✅ Click on the top right corner of a node to open the code of the node in the editor

## 👀 What's Coming Next?
I've got some cool ideas in the works:
- ⬜ Integration with documentation tools
- ⬜ And whatever else you folks suggest!

## 🤝 Want to Help?

I am working on the best way for you to share your ideas with me.
For now if you got any suggestions or bugs, you can:
- Open an issue on [GitHub](https://github.com/joanvilarrasa/ts2uml/issues)
- Send me a DM on [X](https://x.com/joan_vilarrasa)

## 📝 License

[MIT](LICENSE)
