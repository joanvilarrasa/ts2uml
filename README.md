# ts2uml 🎨

Hey! 👋 This is ts2uml - a cool tool I made that turns your TypeScript code into pretty UML diagrams. 

## 🤔 Why did I build this?

I was working on this complex codebase at my job. I like having things types but there comes a point where you have diminishing returns. This project was way past that point.

I looked around for tools to help me turn the code into a UML diagram so that I maybe could understand something, but everything I found was either too clunky or missing features I really wanted (like being able to filter out the noise). 

So I decided to build my own and that's how ts2uml was born! 

## ✨ Features

### 🎯 Generate UML Diagrams Like Magic
Just right-click a folder in VS Code, hit "Generate UML diagram" and boom! You get this interactive diagram built with React Flow. You can drag stuff around and make it look exactly how you want.

Thanks to [React Flow](https://reactflow.dev/) you can:
  - Drag and drop things around
  - Zoom in and out

### 🔍 Filter Out the Noise
Got too many types cluttering your view? No worries! You can:
- Hide nodes from specific folders or files
- Hide nodes by name
- Hide nodes by type

### 🎨 Configure the auto-layout
Change the auto-layout or the type of links.
- Layouts (from elk.js):
  - 'layered'
  - 'mrtree'
  - 'force'
  - 'radial'
  - 'box'
  - 'random'

- Links:
  - 'straight'
  - 'bezier'
  - 'step'

### 🌐 Share with Your Team
This is very useful for onboarding new people or when you want to share the diagram with someone who doesn't have VS Code.
- Generate a link that works for 24 hours
- The link will open the ts2uml.com website and will show the diagram as you had it when you generated the link

### 💾 Save Your Work
Don't lose your masterpiece:
- Save as PNG (with or without background)
- Save as JSON, you'll be able to import it again (also you'll see the structure of the diagram)
- Copy to clipboard for quick sharing
- Import saved diagrams when you need them

## 🚀 Getting Started

It's super simple:
1. Install the VS Code extension https://marketplace.visualstudio.com/items?itemName=jvilarrasa.ts2uml
2. Right-click any folder with TypeScript files and hit "Generate UML diagram"
3. Customize the diagram as you want
4. Share or save your work!

## 👀 What's Coming Next?

I've got some cool ideas in the works:
- More export options
- Themes to make things prettier
- Integration with documentation tools
- And whatever else you folks suggest!

## 🤝 Want to Help?

Got ideas? Found bugs? Want to contribute? Awesome! Feel free to:
- Open issues
- Submit PRs
- Share your ideas
- Tell me what you think!

## 📝 License

[I should probably put something here 😅]