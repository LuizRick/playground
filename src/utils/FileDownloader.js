
export default {
    downloadFile(data,filename, mime, bom){
        let blobData = (typeof bom !== 'undefined') ? [bom, data] : [data];
        let blob = new Blob(blobData, { type: mime || 'application/octet-stream'});
        if(typeof window.navigator.msSaveBlob !== 'undefined'){
            window.navigator.msSaveBlob(blob, filename);
        }else{
            const blobUrl = window.URL.createObjectURL(blob);
            const tempLink = document.createElement('a');
            tempLink.style.display = 'nome';
            tempLink.href = blobUrl;
            tempLink.setAttribute('download', filename);

            if (typeof tempLink.download === 'undefined') {
                tempLink.setAttribute('target', '_blank');
            }
            
            document.body.appendChild(tempLink);
            tempLink.click();
            
            setTimeout(function() {
                document.body.removeChild(tempLink);
                window.URL.revokeObjectURL(blobUrl);
            }, 0)
        }
    }
}