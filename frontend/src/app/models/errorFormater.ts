export function errorFormater(errors: any): {} {
    
    errors = errors.reduce((obj:any, item:any) => {

        if(typeof item === 'string'){
          obj[item] = true;
        }

        else if (typeof item === 'object') {
          for (let key in item) { 
            let validations = item[key].split('|'); 
            obj[key] = obj[key] || {};
            validations.forEach((validation:string) => {
              let val = validation.split(':');
              obj[key][val[0]] = val[1];
            });
          }
        }

        return obj;

      }, {}
    );
    
    return errors;
    
}