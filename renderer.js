document.addEventListener('DOMContentLoaded', () => {
    const fileTree = document.getElementById('file-tree');
    const resizer = document.getElementById('resizer');
    const content = document.getElementById('content');

    let isResizing = false;

    resizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    const onMouseMove = (e) => {
        if (!isResizing) return;
        const totalWidth = fileTree.offsetWidth + content.offsetWidth + resizer.offsetWidth;
        let newWidth = e.clientX;

        if (newWidth < totalWidth * 0.5 && newWidth > 0) {
            fileTree.style.width = `${newWidth}px`;
            content.style.width = `${totalWidth - newWidth - resizer.offsetWidth}px`;
        }
    };

    const onMouseUp = () => {
        isResizing = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };
});