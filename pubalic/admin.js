(async () => {
    // サーバーから検索データを取得
    const response = await fetch('/api/data');
    const data = await response.json();

    const tableBody = document.querySelector('#searchData tbody');
    tableBody.innerHTML = '';

    // テーブルにデータを追加
    data.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.query}</td>
            <td>${item.ip}</td>
            <td>${item.timestamp}</td>
        `;
        tableBody.appendChild(row);
    });
})();
