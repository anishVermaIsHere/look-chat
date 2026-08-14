import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownRendererPropsType = {
    keyIndex: string,
    content: string 
}

const MarkdownRenderer = ({ keyIndex, content }: MarkdownRendererPropsType) => { 
    return (
        <ReactMarkdown key={keyIndex} remarkPlugins={[remarkGfm]}>
            {content}
        </ReactMarkdown>
    )
}

export default MarkdownRenderer