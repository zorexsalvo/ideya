new Vue({
el: '#app',
delimiters: ['[[', ']]'],
data: {
  problemListForm: true,
  problemForm: {
    title: '',
    description: '',
    created_by: ''
  },
  problems: []
},
methods: {
  addNewIdea: function() {
    this.problemListForm = false;
    this.problemForm.title = '';
    this.problemForm.description = '';
    this.problemForm.created_by = '';
  },
  submitIdea: function() {
    var vue = this;
    console.log(this.problemForm.description);
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.post('http://localhost:8000/api/problems/', {
        title: vue.problemForm.title,
        description: vue.problemForm.description,
        created_by: vue.problemForm.created_by
    })
    .then(function(response) {
      vue.problemListForm = true;
      vue.problems.push(response.data);
    });
  },
  concatenateParams: function(baseurl, identifier) {
     return baseurl + "?q=" + identifier;
  }
},
created: function() {
  var vue = this;
  var getProblems = axios({
    method: 'get',
    url: 'http://localhost:8000/api/problems/',
  })
  .then(function(response) {
    vue.problems = response.data;
  });
}
});

