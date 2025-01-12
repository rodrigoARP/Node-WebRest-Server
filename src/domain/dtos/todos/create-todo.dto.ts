


export class CreateTodoDto {

    private constructor(
        public readonly text:string,
    ){}

    static create( properties: {[key: string]: any} ): [string?, CreateTodoDto?] {
        
        const { text } = properties;

        if( !text ) return['Text property is required', undefined];

        return [undefined, new CreateTodoDto(text)];
    }
}