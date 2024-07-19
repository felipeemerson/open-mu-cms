import React, { useEffect } from 'react';

import { Control, useController } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import type { NewsForm } from '@/api/types';

import NewsHtmlContainer from '../NewsHtmlContainer/NewsHtmlContainer';

import {
  ClassicEditor,
  AccessibilityHelp,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  Bold,
  Code,
  Essentials,
  GeneralHtmlSupport,
  Heading,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Paragraph,
  SelectAll,
  ShowBlocks,
  SourceEditing,
  TextTransformation,
  TodoList,
  Undo,
  EventInfo,
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import './ckeditor.css';

type RichTextCKEditorProps = {
  control: Control<NewsForm>;
  initialValue?: string;
};
const RichTextCKEditor: React.FC<RichTextCKEditorProps> = ({
  control,
  initialValue = '',
}) => {
  const {
    field: { onChange },
  } = useController({
    name: 'content',
    control,
    rules: { required: true },
  });

  const editorConfig = {
    fullPage: true,
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'sourceEditing',
        'showBlocks',
        'selectAll',
        '|',
        'heading',
        '|',
        'bold',
        'italic',
        'code',
        '|',
        'link',
        'insertImageViaUrl',
        'htmlEmbed',
        '|',
        'bulletedList',
        'numberedList',
        'todoList',
        '|',
        'accessibilityHelp',
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Autoformat,
      AutoImage,
      AutoLink,
      Autosave,
      Bold,
      Code,
      Essentials,
      GeneralHtmlSupport,
      Heading,
      HtmlEmbed,
      ImageBlock,
      ImageCaption,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      Paragraph,
      SelectAll,
      ShowBlocks,
      SourceEditing,
      TextTransformation,
      TodoList,
      Undo,
    ],
    heading: {
      options: [
        {
          model: 'paragraph',
          title: 'Paragraph',
          class: 'ck-heading_paragraph',
        },
        {
          model: 'heading1',
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1',
        },
        {
          model: 'heading2',
          view: 'h2',
          title: 'Heading 2',
          class: 'ck-heading_heading2',
        },
        {
          model: 'heading3',
          view: 'h3',
          title: 'Heading 3',
          class: 'ck-heading_heading3',
        },
        {
          model: 'heading4',
          view: 'h4',
          title: 'Heading 4',
          class: 'ck-heading_heading4',
        },
        {
          model: 'heading5',
          view: 'h5',
          title: 'Heading 5',
          class: 'ck-heading_heading5',
        },
        {
          model: 'heading6',
          view: 'h6',
          title: 'Heading 6',
          class: 'ck-heading_heading6',
        },
      ],
    },
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true,
        },
      ],
    },
    image: {
      toolbar: [
        'toggleImageCaption',
        'imageTextAlternative',
        '|',
        'imageStyle:alignBlockLeft',
        'imageStyle:block',
        'imageStyle:alignBlockRight',
        '|',
        'resizeImage',
      ],
      styles: {
        options: ['alignBlockLeft', 'block', 'alignBlockRight'],
      },
    },
    initialData: initialValue,
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file',
          },
        },
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    placeholder: '',
  };

  const handleChange = (_: EventInfo, editor: ClassicEditor) => {
    onChange(editor.getData());
  };

  useEffect(() => {}, [initialValue]);

  return (
    <NewsHtmlContainer>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfig as any}
        onChange={handleChange}
      />
    </NewsHtmlContainer>
  );
};

export default RichTextCKEditor;
