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
          Hola, {{ $user->email }} !
        </h1>
        <h2
          style="
            font-family: Helvetica, Arial, sans-serif;
            font-size: 22px;
            font-style: normal;
            font-weight: 400;
            line-height: 28px;
          "
        >
          Por favor clica en el siguiente botón para verificar tu correo
          electrónico
        </h2>
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="margin: 30px auto; padding: 0; text-align: center; width: 100%"
        >
          <tbody>
            <tr>
              <td>
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                  <tbody>
                    <tr>
                      <td align="center">
                        <table border="0" cellpadding="0" cellspacing="0">
                          <tbody>
                            <tr>
                              <td>
                                <a
                                  href="{{$url}}"
                                  rel="noopener"
                                  style="
                                    background: #d7b1f2;
                                    border-radius: 33px;
                                    border: none;
                                    color: #191a19;
                                    cursor: pointer;
                                    font-family: Helvetica, Arial, sans-serif;
                                    font-size: 16px;
                                    font-style: normal;
                                    font-weight: 400;
                                    line-height: 24px;
                                    padding: 12px 16px;
                                    text-align: center;
                                    text-decoration: none;
                                  "
                                  target="_blank"
                                  >Verifica tu correo</a
                                >
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
            Si tiene problemas para hacer clic en el botón "Verifica tu correo", copie y pegue la siguiente URL en su navegador web: <a href="">{{ $url }}</a>
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
