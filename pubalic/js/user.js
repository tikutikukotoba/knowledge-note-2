document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // フォームのデフォルト送信を防ぐ

    const query = document.getElementById('searchInput').value;
    const ip = '192.168.1.1'; // 仮のIPアドレス（実際にはバックエンドで取得可能）

    try {
        const response = await fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, ip }),
        });

        if (response.ok) {
            alert('検索データが送信されました！');
        } else {
            throw new Error('データ送信エラー');
        }
    } catch (error) {
        console.error('検索に失敗しました:', error);
    }
});
