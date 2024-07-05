       function applyFilter() {
            const selectBox = document.getElementById('selectBox');
            const selectedValue = selectBox.value;
            const baseUrl = document.querySelector('.boxFilter').dataset.urlFilter;

            const params = new URLSearchParams(window.location.search);

            if (selectedValue) {
                params.set('selectBox', selectedValue);
            } else {
                params.delete('selectBox');
            }

            const newUrl = `${baseUrl}?${params.toString()}`;
            window.location.href = newUrl;
        }
