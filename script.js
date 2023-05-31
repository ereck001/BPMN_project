
let canvas = document.querySelector('#canvas');
let fileInput = document.querySelector('#file-input');
let exportButton = document.querySelector('#export-button');
let importButton = document.querySelector('#import-button');

const modeler = new BpmnJS({
  container: canvas,
  keyboard: {
    bindTo: window
  }
});
// Carregar o diagrama BPMN do arquivo selecionado pelo usuário
fileInput.addEventListener('change', function(event) {
  var file = event.target.files[0];
  var reader = new FileReader();

  reader.onload = function(e) {
    var bpmnXml = e.target.result;

    modeler.importXML(bpmnXml, function(err) {
      if (err) {
        console.error('Erro ao carregar o arquivo BPMN', err);
      } else {
        console.log('Diagrama BPMN carregado com sucesso.');
      }
    });
  };

  reader.readAsText(file);

  importButton.removeAttribute('hidden');
  fileInput.setAttribute('hidden','');

});

modeler.createDiagram(function() {
  console.log('Diagrama BPMN vazio criado.');
});

exportButton.addEventListener('click', function() {
  modeler.saveXML({ format: true }, function(err, xml) {
    if (err) {
      console.error('Erro ao exportar o diagrama BPMN como XML', err);
    } else {
      downloadDiagram(xml, 'diagrama.bpmn');
    }
  });
});

function downloadDiagram(data, filename) {
  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/xml;charset=utf-8,' + encodeURIComponent(data));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function showBtn(){
  fileInput.removeAttribute('hidden');
  importButton.setAttribute('hidden','');
}