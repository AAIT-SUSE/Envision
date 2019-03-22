import vue from 'vue'
import envisionEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import '../assets/envision-editor.css'

vue.use(envisionEditor, {
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
});