<html>
  <body style="color: #191a19; font-family: Helvetica, Arial, sans-serif">
    <style>
      a {
        text-decoration: none;
        color: inherit !important;
      }
    </style>
    <section style="background-color: #f4eafa; padding: 15px">
      <div style="border-bottom: 2px solid #d7b1f2; padding-bottom: 15px">
        <img
          style="max-width: 150px"
          src="https://github.com/ScienceForChange/odourcollect_public_files/blob/main/Logo-OdourCollect.png?raw=true"
        />
      </div>
      <div>
        <h1
          style="
            color: #d7b1f2 !important;
            font-family: Helvetica, Arial, sans-serif;
            font-size: 28px;
            font-style: normal;
            font-style: normal;
            font-weight: 400;
            font-weight: 400;
            line-height: 32px;
            margin-bottom: 10px;
            text-decoration: none !important;
          "
        >
          Feedback recibido del usuario: {{ $data['email'] }} !!
        </h1>
        <p>
            {{ $data['message'] }}
        </p>
        <p
          style="
            font-family: Helvetica, Arial, sans-serif;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 24px;
          "
        >
          Saludos, <br />
          OdourCollect
        </p>
      </div>
    </section>
  </body>
</html>
