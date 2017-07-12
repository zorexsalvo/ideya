new Vue({
el: '#app',
delimiters: ['[[', ']]'],
data: {
  state: 'list',
  problemForm: {
    title: '',
    description: '',
    created_by: ''
  },
  problems: []
},
methods: {
  addNewIdea: function() {
    this.state = 'new';
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
      vue.state = 'list';
      vue.problems.push(response.data);
    });
  },
  cancelSubmit: function() {
    this.state = 'list';
  },
  getDetails: function(problem_id) {
    this.state = 'details';
    var vue = this;
    var getProblems = axios({
      method: 'get',
      url: 'http://localhost:8000/api/problems/' + problem_id + '/',
    })
    .then(function(response) {
      console.log(response.data);
      details = response.data;
      vue.problemForm.title = details.title;
      vue.problemForm.description = details.description;
      vue.problemForm.created_by = details.created_by;
    });
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
