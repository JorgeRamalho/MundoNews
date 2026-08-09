import { Link } from 'react-router-dom';
import type { EditorialBlock as EditorialBlockType } from '@js/editorial';

interface EditorialBlockProps {
  block: EditorialBlockType;
  variant?: 'sidebar' | 'home';
}

export default function EditorialBlock({ block, variant = 'sidebar' }: EditorialBlockProps) {
  return (
    <div className={`sidebar-widget editorial-block${variant === 'home' ? ' editorial-block--home' : ''}`}>
      <h3 className="sidebar-widget__title">
        <span className="editorial-block__emoji" aria-hidden="true">{block.emoji}</span>
        {block.title}
      </h3>
      <p className="editorial-block__text">{block.content}</p>
      {block.link && (
        <Link to={block.link.path} className="editorial-block__link">
          {block.link.label} →
        </Link>
      )}
    </div>
  );
}
