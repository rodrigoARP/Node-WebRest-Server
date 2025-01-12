



export class UpdateTodoDto {

    private constructor(
        public readonly id?: number,
        public readonly text?: string,
        public readonly createdAt?: Date,
    ){}

    get values () {

        const returnValues: {[key: string]: any} = {};
        
        if( this.text ) returnValues.text = this.text;
        if( this.createdAt ) returnValues.createdAt = this.createdAt;

        return returnValues;
    }

    static create( properties: {[key: string]: any} ): [string?, UpdateTodoDto?] {
        
        const { id, text, createdAt } = properties;
        let newCreatedAt = createdAt;

        if( !id || isNaN( Number(id) ) ){
            return['id must be a valid nuber'];
        }

        if( createdAt ){
            newCreatedAt = new Date ( createdAt )
            if( newCreatedAt.toString() === 'Invalid Date'){
                return ['CreatedAt must be a valid date']
            }
        }


        return [undefined, new UpdateTodoDto(id, text, newCreatedAt)];
    }
}