# PDF Stitcher

Sometimes you need to stitch some text and documents into a single PDF for submissions to online platforms. This tool helps you do that.

With power of markdown, you can create a completely ready submission document with any text editor and have any LLM generate the content for you.

## Markdown Features

### Math Expressions

Use LaTeX-style math expressions that will be rendered using MathJax:

```markdown
Inline math: $E = mc^2$

Display math:
$$\int_{-\infty}^\infty e^{-x^2} dx = \sqrt{\pi}$$
```

### Images

Include images with custom sizes:

```markdown
![Alt text](path/to/image.jpg =250x150)
```

### Page Breaks

Insert page breaks using:

```markdown
\pagebreak
```

### PDF Embedding

Embed PDFs that will be included in the final output:

```markdown
![PDF Document](path/to/document.pdf)
```

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
