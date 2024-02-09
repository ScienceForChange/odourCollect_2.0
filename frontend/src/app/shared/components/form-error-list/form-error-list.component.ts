import { Component, Input } from '@angular/core';

@Component({
  selector:`app-form-error-list`,
  templateUrl:`./form-error-list.component.html`,
  styleUrls: ['./form-error-list.component.scss']
})
export class FormErrorListComponent {


  @Input() errorList:any;
  @Input() field: string | null | undefined = null;

  public errorTranslations: { [key: string]: string } = {
    'minlength':`Mínimo 8 caracteres.`,
    'noMatch':`Las contraseñas no coinciden.`,

    'pattern': `Inválido.`,
    'accepted' :`Debe ser aceptado.`,
    'accepted_if' :`Debe ser aceptado cuando :other es :value.`,
    'active_url' :`No es una URL válida.`,
    'after' :`Debe ser una fecha después de :date.`,
    'after_or_equal' :`Debe ser una fecha después o igual a :date.`,
    'alpha' :`Sólo puede contener letras.`,
    'alpha_dash' :`Sólo puede contener letras, números y guiones.`,
    'alpha_num' :`Sólo puede contener letras y números.`,
    'array' :`Debe ser un arreglo.`,
    'ascii' :`Solo debe contener símbolos y caracteres alfanuméricos de un solo byte.`,
    'before' :`Debe ser una fecha antes de :date.`,
    'before_or_equal' :`Debe ser una fecha antes o igual a :date.`,

    'boolean' :`Debe ser verdadero o falso.`,
    'confirmed' :`El campo de confirmación no coincide.`,
    'current_password' :`La contraseña actual no es correcta`,
    'date' :`No es una fecha válida.`,
    'date_equals' :`Debe ser una fecha igual a :date.`,
    'date_format' :`No corresponde con el formato :format.`,
    'decimal' :`Debe tener :decimal decimales.`,
    'declined' :`Debe marcar como rechazado.`,
    'declined_if' :`Debe marcar como rechazado cuando :other es :value.`,
    'different' :`Deben ser diferentes.`,
    'digits' :`Debe ser de :digits dígitos.`,
    'digits_between' :`Debe tener entre :min y :max dígitos.`,
    'dimensions' :`N tiene una dimensión válida.`,
    'distinct' :`Tiene un valor duplicado.`,
    'doesnt_end_with' :`No puede finalizar con uno de los siguientes valores: :values.`,
    'doesnt_start_with' :`No puede comenzar con uno de los siguientes valores: :values.`,
    'email' :`El email no es válido.`,
    'ends_with' :`Debe terminar con alguno de los valores: :values.`,
    'enum' :`No es válido.`,
    'exists' :`No es válido.`,
    'file' :`Debe ser un archivo.`,
    'filled' :`Es requerido.`,

    'image' :`Debe ser una imagen.`,
    'in' :`No es válido.`,
    'in_array' :`No existe en :other.`,
    'integer' :`Debe ser un entero.`,
    'ip' :`Debe ser una dirección IP válida.`,
    'ipv4' :`Debe ser una dirección IPv4 válida.`,
    'ipv6' :`Debe ser una dirección IPv6 válida.`,
    'json' :`Debe ser una cadena JSON válida.`,
    'lowercase' :`Debe ser minusculas.`,

    'mac_address' :`Debe ser una dirección MAC válida.`,
    'max_digits' :`No puede superar los :max dígitos.`,
    'mimes' :`Debe ser un archivo de tipo: :values.`,
    'mimetypes' :`Debe ser un archivo de tipo: :values.`,

    'min_digits' :`Debe ser como mínimo de :min dígitos.`,
    'missing' :`Debe faltar.`,
    'missing_if' :`Debe faltar cuando :other es :value`,
    'missing_unless' :`Debe faltar a menos que :other sea :value.`,
    'missing_with' :`Debe faltar cuando :values está presente.`,
    'missing_with_all' :`Debe faltar cuando :values están presentes`,
    'multiple_of' :`Debe ser un múltiplo de :value.`,
    'not_in' :`La selección no es invalida.`,
    'not_regex' :`El formato no es válido.`,
    'numeric' :`Debe ser un número.`,
    'present' :`Debe estar presente.`,
    'prohibited' :`No está permitido.`,
    'prohibited_if' :`No está permitido cuando :other es :value.`,
    'prohibited_unless' :`No está permitido si :other no está en :values.`,
    'prohibits' :`No permite que :other esté presente.`,
    'regex' :`El formato no es válido.`,
    'required' :`Es requerido.`,
    'required_array_keys' :`Debe contener entradas para: :values.`,
    'required_if' :`Es requerido cuando el campo :other es :value.`,
    'required_unless' :`Es requerido a menos que :other esté presente en :values.`,
    'required_with' :`Es requerido cuando :values está presente.`,
    'required_with_all' :`Es requerido cuando :values está presente.`,
    'required_without' :`Es requerido cuando :values no está presente.`,
    'required_without_all' :`Es requerido cuando ningún :values está presente.`,
    'same' :`Debe coincidir.`,

    'starts_with' :`Debe empezar con uno de los siguientes valores :values`,
    'string' :`Debe ser una cadena.`,
    'timezone' :`Debe ser una zona válida.`,
    'unique' :`Ya ha sido tomado.`,
    'uploaded' :`No ha podido ser cargado.`,
    'uppercase' :`Debe estar en mayúsculas`,
    'url' :`El formato no es válido.`,
    'ulid' :`Debe ser un ULID valido.`,
    'uuid' :`Debe ser un UUID valido.`,

    'min.numeric' : `Debe tener al menos :min.`,
    'min.file' : `Debe tener al menos :min kilobytes.`,
    'min.string' : `Debe tener al menos :min caracteres.`,
    'min.array' : `Debe tener al menos :min elementos.`,

    'between.numeric' :`Debe estar entre :min - :max.`,
    'between.file' :`Debe estar entre :min - :max kilobytes.`,
    'between.string' :`Debe estar entre :min - :max caracteres.`,
    'between.array' :`Debe tener entre :min y :max elementos.`,

    'lt.numeric' : `Debe ser menor que :max.`,
    'lt.file' : `Debe ser menor que :max kilobytes.`,
    'lt.string' : `Debe ser menor que :max caracteres.`,
    'lt.array' : `Puede tener hasta :max elementos.`,

    'lte.numeric' : `Debe ser menor o igual que :max.`,
    'lte.file' : `Debe ser menor o igual que :max kilobytes.`,
    'lte.string' : `Debe ser menor o igual que :max caracteres.`,
    'lte.array' : `No puede tener más que :max elementos.`,

    'max.numeric' : `Debe ser menor que :max.`,
    'max.file' : `Debe ser menor que :max kilobytes.`,
    'max.string' : `Debe ser menor que :max caracteres.`,
    'max.array' : `Puede tener hasta :max elementos.`,

    'gt.numeric' : `Debe ser mayor que :value.`,
    'gt.file' : `Debe ser mayor que :value kilobytes.`,
    'gt.string' : `Debe ser mayor que :value caracteres.`,
    'gt.array' : `Puede tener hasta :value elementos.`,

    'gte.numeric' : `Debe ser mayor o igual que :value.`,
    'gte.file' : `Debe ser mayor o igual que :value kilobytes.`,
    'gte.string' : `Debe ser mayor o igual que :value caracteres.`,
    'gte.array' : `puede tener :value elementos o más.`,

    'size.numeric' :`Debe ser :size.`,
    'size.file' :`Debe tener :size kilobytes.`,
    'size.string' :`Debe tener :size caracteres.`,
    'size.array' :`Debe contener :size elementos.`,

    'password.mixed' :`Debe contener al menos una letra mayúscula y una minúscula.`,
    'password.letters' :`Debe contener al menos una letra.`,
    'password.symbols' :`Debe contener al menos un símbolo.`,
    'password.numbers' :`Debe contener al menos un número.`,
    'password.uncompromised' :`La contraseña ha aparecido en una fuga de datos. Elija una contraseña diferente.`,
  }
  public errorTranslationsWithNameField: { [key: string]: string } = {
    'pattern': `:attribute inválido.`,
    'accepted' :`El campo :attribute debe ser aceptado.`,
    'accepted_if' :`El campo :attribute debe ser aceptado cuando :other es :value.`,
    'active_url' :`El campo :attribute no es una URL válida.`,
    'after' :`El campo :attribute debe ser una fecha después de :date.`,
    'after_or_equal' :`El campo :attribute debe ser una fecha después o igual a :date.`,
    'alpha' :`El campo :attribute sólo puede contener letras.`,
    'alpha_dash' :`El campo :attribute sólo puede contener letras, números y guiones.`,
    'alpha_num' :`El campo :attribute sólo puede contener letras y números.`,
    'array' :`El campo :attribute debe ser un arreglo.`,
    'ascii' :`El :attribute solo debe contener símbolos y caracteres alfanuméricos de un solo byte.`,
    'before' :`El campo :attribute debe ser una fecha antes de :date.`,
    'before_or_equal' :`El campo :attribute debe ser una fecha antes o igual a :date.`,

    'boolean' :`El campo :attribute debe ser verdadero o falso.`,
    'confirmed' :`El campo de confirmación de :attribute no coincide.`,
    'current_password' :`La contraseña actual no es correcta`,
    'date' :`El campo :attribute no es una fecha válida.`,
    'date_equals' :`El campo :attribute debe ser una fecha igual a :date.`,
    'date_format' :`El campo :attribute no corresponde con el formato :format.`,
    'decimal' :`El :attribute debe tener :decimal decimales.`,
    'declined' :`El campo :attribute debe marcar como rechazado.`,
    'declined_if' :`El campo :attribute debe marcar como rechazado cuando :other es :value.`,
    'different' :`Los campos :attribute y :other deben ser diferentes.`,
    'digits' :`El campo :attribute debe ser de :digits dígitos.`,
    'digits_between' :`El campo :attribute debe tener entre :min y :max dígitos.`,
    'dimensions' :`El campo :attribute no tiene una dimensión válida.`,
    'distinct' :`El campo :attribute tiene un valor duplicado.`,
    'doesnt_end_with' :`El campo :attribute no puede finalizar con uno de los siguientes valores: :values.`,
    'doesnt_start_with' :`El campo :attribute no puede comenzar con uno de los siguientes valores: :values.`,
    'email' :`El formato del :attribute no es válido.`,
    'ends_with' :`El campo :attribute debe terminar con alguno de los valores: :values.`,
    'enum' :`El campo seleccionado en :attribute no es válido.`,
    'exists' :`El campo :attribute seleccionado no es válido.`,
    'file' :`El campo :attribute debe ser un archivo.`,
    'filled' :`El campo :attribute es requerido.`,

    'image' :`El campo :attribute debe ser una imagen.`,
    'in' :`El campo :attribute seleccionado no es válido.`,
    'in_array' :`El campo :attribute no existe en :other.`,
    'integer' :`El campo :attribute debe ser un entero.`,
    'ip' :`El campo :attribute debe ser una dirección IP válida.`,
    'ipv4' :`El campo :attribute debe ser una dirección IPv4 válida.`,
    'ipv6' :`El campo :attribute debe ser una dirección IPv6 válida.`,
    'json' :`El campo :attribute debe ser una cadena JSON válida.`,
    'lowercase' :`El :attribute debe ser minusculas.`,

    'mac_address' :`El campo :attribute debe ser una dirección MAC válida.`,
    'max_digits' :`El campo :attribute no puede superar los :max dígitos.`,
    'mimes' :`El campo :attribute debe ser un archivo de tipo: :values.`,
    'mimetypes' :`El campo :attribute debe ser un archivo de tipo: :values.`,

    'min_digits' :`El campo :attribute debe ser como mínimo de :min dígitos.`,
    'missing' :`El campo :attribute debe faltar.`,
    'missing_if' :`El campo :attribute debe faltar cuando :other es :value`,
    'missing_unless' :`El campo :attribute debe faltar a menos que :other sea :value.`,
    'missing_with' :`El campo :attribute debe faltar cuando :values está presente.`,
    'missing_with_all' :`El campo :attribute debe faltar cuando :values están presentes`,
    'multiple_of' :`El campo :attribute debe ser un múltiplo de :value.`,
    'not_in' :`El campo :attribute seleccionado es invalido.`,
    'not_regex' :`El formato del campo :attribute no es válido.`,
    'numeric' :`El campo :attribute debe ser un número.`,
    'present' :`El campo :attribute debe estar presente.`,
    'prohibited' :`El campo :attribute no está permitido.`,
    'prohibited_if' :`El campo :attribute no está permitido cuando :other es :value.`,
    'prohibited_unless' :`El campo :attribute no está permitido si :other no está en :values.`,
    'prohibits' :`El campo :attribute no permite que :other esté presente.`,
    'regex' :`El formato del campo :attribute no es válido.`,
    'required' :`El campo :attribute es requerido.`,
    'required_array_keys' :`El campo :attribute debe contener entradas para: :values.`,
    'required_if' :`El campo :attribute es requerido cuando el campo :other es :value.`,
    'required_unless' :`El campo :attribute es requerido a menos que :other esté presente en :values.`,
    'required_with' :`El campo :attribute es requerido cuando :values está presente.`,
    'required_with_all' :`El campo :attribute es requerido cuando :values está presente.`,
    'required_without' :`El campo :attribute es requerido cuando :values no está presente.`,
    'required_without_all' :`El campo :attribute es requerido cuando ningún :values está presente.`,
    'same' :`El campo :attribute y :other debe coincidir.`,

    'starts_with' :`El :attribute debe empezar con uno de los siguientes valores :values`,
    'string' :`El campo :attribute debe ser una cadena.`,
    'timezone' :`El campo :attribute debe ser una zona válida.`,
    'unique' :`El campo :attribute ya ha sido tomado.`,
    'uploaded' :`El campo :attribute no ha podido ser cargado.`,
    'uppercase' :`El :attribute debe estar en mayúsculas`,
    'url' :`El formato de :attribute no es válido.`,
    'ulid' :`El :attribute debe ser un ULID valido.`,
    'uuid' :`El :attribute debe ser un UUID valido.`,

    'min.numeric' : `El campo :attribute debe tener al menos :min.`,
    'min.file' : `El campo :attribute debe tener al menos :min kilobytes.`,
    'min.string' : `El campo :attribute debe tener al menos :min caracteres.`,
    'min.array' : `El campo :attribute debe tener al menos :min elementos.`,

    'between.numeric' :`El campo :attribute debe estar entre :min - :max.`,
    'between.file' :`El campo :attribute debe estar entre :min - :max kilobytes.`,
    'between.string' :`El campo :attribute debe estar entre :min - :max caracteres.`,
    'between.array' :`El campo :attribute debe tener entre :min y :max elementos.`,

    'lt.numeric' : `El campo :attribute debe ser menor que :max.`,
    'lt.file' : `El campo :attribute debe ser menor que :max kilobytes.`,
    'lt.string' : `El campo :attribute debe ser menor que :max caracteres.`,
    'lt.array' : `El campo :attribute puede tener hasta :max elementos.`,

    'lte.numeric' : `El campo :attribute debe ser menor o igual que :max.`,
    'lte.file' : `El campo :attribute debe ser menor o igual que :max kilobytes.`,
    'lte.string' : `El campo :attribute debe ser menor o igual que :max caracteres.`,
    'lte.array' : `El campo :attribute no puede tener más que :max elementos.`,

    'max.numeric' : `El campo :attribute debe ser menor que :max.`,
    'max.file' : `El campo :attribute debe ser menor que :max kilobytes.`,
    'max.string' : `El campo :attribute debe ser menor que :max caracteres.`,
    'max.array' : `El campo :attribute puede tener hasta :max elementos.`,

    'gt.numeric' : `El campo :attribute debe ser mayor que :value.`,
    'gt.file' : `El campo :attribute debe ser mayor que :value kilobytes.`,
    'gt.string' : `El campo :attribute debe ser mayor que :value caracteres.`,
    'gt.array' : `El campo :attribute puede tener hasta :value elementos.`,

    'gte.numeric' : `El campo :attribute debe ser mayor o igual que :value.`,
    'gte.file' : `El campo :attribute debe ser mayor o igual que :value kilobytes.`,
    'gte.string' : `El campo :attribute debe ser mayor o igual que :value caracteres.`,
    'gte.array' : `El campo :attribute puede tener :value elementos o más.`,

    'size.numeric' :`El campo :attribute debe ser :size.`,
    'size.file' :`El campo :attribute debe tener :size kilobytes.`,
    'size.string' :`El campo :attribute debe tener :size caracteres.`,
    'size.array' :`El campo :attribute debe contener :size elementos.`,

    'password.mixed' :`El :attribute debe contener al menos una letra mayúscula y una minúscula.`,
    'password.letters' :`El :attribute debe contener al menos una letra.`,
    'password.symbols' :`El :attribute debe contener al menos un símbolo.`,
    'password.numbers' :`El :attribute debe contener al menos un número.`,
    'password.uncompromised' :`El atributo :attribute  ha aparecido en una fuga de datos. Elija un :attribute diferente.`,

    //custom
    'min_age' : `Debe ser mayor de :min años.`,
  }

  public getErrorTranslation(error: any, required: any = '0'): any {

    if(this.errorTranslationsWithNameField[error] && this.field ){
      let message =  this.errorTranslationsWithNameField[error].replace(':attribute', this.field);
      for(let key in required){
        message = message.replace(`:${key}`, required[key]);
      }
      return message;
    }
    else if(this.errorTranslations[error] && this.field ){
      return this.errorTranslations[error].replace(':attribute', this.field);
    }
    else if(this.errorTranslations[error]){
      return this.errorTranslations[error];
    }

    return error;

  }
}
