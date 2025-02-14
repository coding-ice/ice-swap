import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

const allowedTags = sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3']);

const allowedAttributes = Object.assign({}, sanitizeHtml.defaults.allowedAttributes, {
  img: ['alt', 'src'],
});

interface NotePreviewProps {
  children: string;
}

const NotePreview: React.FC<NotePreviewProps> = ({ children }) => {
  return (
    <div className="note-preview">
      <div
        className="text-with-markdown"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(marked(children) as string, {
            allowedTags,
            allowedAttributes,
          }),
        }}
      />
    </div>
  );
};

export default NotePreview;
