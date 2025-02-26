import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface DocsToolMarkdownProps {
    content: string;
    className?: string;
}

export function DocsToolMarkdown({ content, className }: DocsToolMarkdownProps) {
    return (
        <ScrollArea className={cn('h-full w-full', className)}>
            <div className='prose prose-sm dark:prose-invert max-w-none p-4'>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ className, ...props }) => (
                            <h1 className={cn('mt-6 mb-4 font-bold text-2xl', className)} {...props} />
                        ),
                        h2: ({ className, ...props }) => (
                            <h2 className={cn('mt-5 mb-3 font-bold text-xl', className)} {...props} />
                        ),
                        h3: ({ className, ...props }) => (
                            <h3 className={cn('mt-4 mb-2 font-bold text-lg', className)} {...props} />
                        ),
                        h4: ({ className, ...props }) => (
                            <h4 className={cn('mt-3 mb-1 font-bold text-base', className)} {...props} />
                        ),
                        p: ({ className, ...props }) => (
                            <p className={cn('my-2', className)} {...props} />
                        ),
                        ul: ({ className, ...props }) => (
                            <ul className={cn('my-2 list-disc pl-6', className)} {...props} />
                        ),
                        ol: ({ className, ...props }) => (
                            <ol className={cn('my-2 list-decimal pl-6', className)} {...props} />
                        ),
                        li: ({ className, ...props }) => (
                            <li className={cn('my-1', className)} {...props} />
                        ),
                        code: ({ className, ...props }) => (
                            <code className={cn('rounded bg-muted px-1 py-0.5 text-sm', className)} {...props} />
                        ),
                        pre: ({ className, ...props }) => (
                            <pre className={cn('my-3 overflow-auto rounded-md bg-muted p-3', className)} {...props} />
                        ),
                        a: ({ className, ...props }) => (
                            <a className={cn('text-primary underline', className)} {...props} />
                        ),
                        blockquote: ({ className, ...props }) => (
                            <blockquote className={cn('my-3 border-muted border-l-4 pl-4 italic', className)} {...props} />
                        ),
                        table: ({ className, ...props }) => (
                            <div className='my-3 overflow-auto'>
                                <table className={cn('w-full border-collapse', className)} {...props} />
                            </div>
                        ),
                        th: ({ className, ...props }) => (
                            <th className={cn('border border-muted px-3 py-2 text-left font-bold', className)} {...props} />
                        ),
                        td: ({ className, ...props }) => (
                            <td className={cn('border border-muted px-3 py-2', className)} {...props} />
                        ),
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </ScrollArea>
    );
} 