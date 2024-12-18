(function() {

  function loadPosts() {
    var request = fetch('http://localhost:5000/api/posts');
    request.then(function(response) {
      var data = response.json();
      data.then(function(posts) {
        var output = '';
        posts.forEach(function(post) {
          output += `
            <div class="card">
              <h3>${post.title}</h3>
              <p>${post.body}</p>
              <hr />
            </div>
          `;
        });
        document.getElementById('output').innerHTML = output;
      });
    });
    request.catch(function(error) {
      console.error(error);
    });
  }

  function addPost() {
    // get the value from the textare
    var content = document.getElementById('post').value;
    fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'Post title',
        body: content
      })
    }).then(function(response) {
      var data = response.json();
      data.then(function(post) {
        var output = `
          <div class="card">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <hr />
          </div>
        `;
        document.getElementById('output').innerHTML += output;
      });
    }).catch(function(error) {
      console.error(error);
    });
  }

  document.getElementById('btn').addEventListener('click', loadPosts);
  document.getElementById("add").addEventListener('click', addPost);

})();