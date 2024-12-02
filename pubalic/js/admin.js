window.addEventListener('load', async () => {
    try {
        const response = await fetch('/data.json'); // data.json を取得
        if (!response.ok) {
            throw new Error('データを取得できませんでした');
        }

        const searchData = await response.json();
        const tableBody = document.querySelector('#searchData tbody');

        // テーブルをクリア
        tableBody.innerHTML = '';

        // データをテーブルに挿入
        searchData.forEach((entry) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.query}</td>
                <td>${entry.ip}</td>
                <td>${entry.timestamp}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('データの読み込みに失敗しました:', error);
    }
});
