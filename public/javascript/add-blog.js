async function createBlog(event) {
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim();
    const post_contents = document.querySelector('#post-contents').value.trim();

    if (title && post_contents) {
        const response = await fetch('/api/blogs', {
            method: 'post',
            body: JSON.stringify({
                title,
                post_contents
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            alert('Blog post created successfully!');
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.createBlog').addEventListener('submit', createBlog);