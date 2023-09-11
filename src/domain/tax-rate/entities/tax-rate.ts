
export class TaxRateModel{
    constructor(
        public venue:string= "",
        public type: string = "Akina",
        public percentage: number = 0,
    ){}
}

export class TaxRateEntity{
    constructor(
        public id: string | undefined = undefined,
        public venue:string,
        public type:string ,
        public percentage: number 
    ){}
}
export class TaxRateMapper{
     static toEntity(
        taxRate:any,
        includeId?:boolean,
        existingTaxRate?:TaxRateEntity|null
        ):TaxRateEntity{
            if(existingTaxRate != null){
                return {
                    ...existingTaxRate,
                    venue:
                    taxRate.venue!==undefined
                    ? taxRate.venue:
                    existingTaxRate.venue,
                    type:
                    taxRate.type!==undefined
                    ?taxRate.type:existingTaxRate.type,
                    percentage:
                    taxRate.percentage!==undefined
                    ?taxRate.percentage:existingTaxRate.percentage
                }
            }
            else {
                const taxRateEntity:TaxRateEntity ={
                    id:includeId
                    ?taxRate._id
                     ?taxRate._id.toString()
                     :undefined
                      :undefined,
                    venue:taxRate.venue,
                    type:taxRate.type,
                    percentage:taxRate.percentage,
                }
                return taxRateEntity;
            }
        }

        static toModel(taxRate:TaxRateEntity):TaxRateModel{
            return{
                venue: taxRate.venue,
                type:taxRate.type,
                percentage: taxRate.percentage,
            }
        }

}