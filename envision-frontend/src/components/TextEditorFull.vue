<template>
  <div class="envision-editor">
    <quill-editor ref="myTextEditor" :content="editorContent" :options="editorOption" >
    </quill-editor>
  </div>
</template>

<script>
  import hljs from 'highlight.js'

  export default {
    props: {
      editorContent: String,
    },
    data:() => ({
      editorContent: '',
      editorOption: {
        placeholder: '在这里输入文字...',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'header': [1, 2, 3, 4, false] }],
            [{ 'font': ['默认', 'monospace'] }],
            [{ 'color': [] }],
            [{ 'align': [] }],
            ['link', 'image']
          ],
        }
      }
    }),
    // methods: {
    //   ChangedEditorContent: function() {
    //     this.$emit('editorContent',editorContent);
    //   }
    // }
  }
</script>

<style>
  .ql-container {
    min-height: 300px;
  }
</style>