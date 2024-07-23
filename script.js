const SPREADSHEET_ID = '1sMZkez_VE8gB8VT4tcXdc4wd9l9LD2xypNrg1itN6e0'; // 스프레드 시트 ID
const API_KEY = 'AIzaSyAF6bApoekt6pDczpFRdwqFJcVYmbtNezc'; // 생성한 API 키

function fetchData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1?key=${API_KEY}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayData(data.values);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayData(data) {
    const table = document.getElementById('data-table');
    const thead = table.querySelector('thead tr');
    const tbody = table.querySelector('tbody');

    // 기존 데이터 삭제
    thead.innerHTML = '';
    tbody.innerHTML = '';

    // 머리글 삽입
    const headers = data[0];
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        thead.appendChild(th);
    });

    // 데이터 행 삽입
    data.slice(1).forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

fetchData();
