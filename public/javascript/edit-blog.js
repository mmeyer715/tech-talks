async function editForm(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="blog_title"]').value;
    const post_contents = document.querySelector('input[name="post_contents"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    console.log(title, post_contents, id);
    const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_contents
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response);
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-blog-form').addEventListener('submit', editForm);