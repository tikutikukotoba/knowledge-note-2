document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchQuery = document.getElementById('searchInput').value;

    // サーバーに検索データを送信
    await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery })
    });

    alert('検索データを記録しました。');
});
