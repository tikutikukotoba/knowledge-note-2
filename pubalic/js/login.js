document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // フォームのデフォルト送信を防ぐ

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        // 成功後に user.html へリダイレクト
        window.location.href = '/user.html';
    } catch (error) {
        console.error('ログインに失敗しました:', error);
    }
});
