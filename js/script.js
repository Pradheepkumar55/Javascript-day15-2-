document.addEventListener('DOMContentLoaded', () => {
    const dataUrl = 'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json';
    const dataListElement = document.getElementById('data-list');
    const paginationElement = document.getElementById('pagination');
    const itemsPerPage = 10;
    let currentPage = 1;
    let data = [];

    fetch(dataUrl)
        .then(response => response.json())
        .then(fetchedData => {
            data = fetchedData;
            renderPage(currentPage);
            renderPagination();
        })
        .catch(error => console.error('Error fetching data:', error));

    function renderPage(page) {
        dataListElement.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = page * itemsPerPage;
        const pageItems = data.slice(start, end);

        pageItems.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${item.id}</td><td>${item.name}</td>`;
            dataListElement.appendChild(tr);
        });
    }

    function renderPagination() {
        const totalPages = Math.ceil(data.length / itemsPerPage);
        paginationElement.innerHTML = '';

        const createButton = (text, page) => {
            const button = document.createElement('span');
            button.className = 'page-item';
            button.textContent = text;

            button.addEventListener('click', () => {
                currentPage = page;
                renderPage(currentPage);
                renderPagination();
            });

            return button;
        };

     
        if (currentPage > 1) {
            paginationElement.appendChild(createButton('First', 1));
            paginationElement.appendChild(createButton('Previous', currentPage - 1));
        }
   
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('span');
            pageItem.className = 'page-item';
            pageItem.textContent = i;

            if (i === currentPage) {
                pageItem.classList.add('active');
            }

            pageItem.addEventListener('click', () => {
                currentPage = i;
                renderPage(currentPage);
                renderPagination();
            });

            paginationElement.appendChild(pageItem);
        }

        
        if (currentPage < totalPages) {
            paginationElement.appendChild(createButton('Next', currentPage + 1));
            paginationElement.appendChild(createButton('Last', totalPages));
        }
    }
});