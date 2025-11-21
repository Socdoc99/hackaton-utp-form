export const contactTemplate = `
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Nuevo mensaje de contacto</title>
  <style>
    body { font-family: Arial, sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0b5cff; color: #fff; padding: 12px; text-align:center; }
    .field { margin-bottom: 12px; }
    .label { font-weight: bold; margin-bottom: 4px; }
    .message { white-space: pre-wrap; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h2>Nuevo mensaje desde el formulario</h2></div>

    <div class="field">
      <div class="label">Nombre:</div>
      <div>{{nameSurname}}</div>
    </div>

    <div class="field">
      <div class="label">Email:</div>
      <div>{{email}}</div>
    </div>

    <div class="field">
      <div class="label">Teléfono:</div>
      <div>{{phone}}</div>
    </div>

    <div class="field">
      <div class="label">Mensaje:</div>
      <div class="message">{{message}}</div>
    </div>
  </div>
</body>
</html>
`;
