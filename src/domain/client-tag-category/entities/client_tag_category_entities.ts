// Express API request populate the ClientTagCategoryModel
export class ClientTagCategoryModel {
  constructor(
    public name: string = "",
    public color: string = "",
    public classification: object = {},
    public vip: boolean = false,
    public display: object = {},
    public followers: string[] = [],
    public createdAt: Date
  ) { }
}

// ClientTagCategoryEntity provided by ClientTagCategory Repository is converted to Express API Response
export class ClientTagCategoryEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public name: string = "",
    public color: string = "",
    public classification: object = {},
    public vip: boolean = false,
    public display: object = {},
    public followers: string[] = [],
    public createdAt: Date
  ) { }
}

/* ================================================= */
export class ClientTagCategoryMapper {
  static toEntity(
    clientTagCategoryData: any,
    includeId?: boolean,
    existingClientTagCategory?: ClientTagCategoryEntity
  ): ClientTagCategoryEntity {
    if (existingClientTagCategory != null) {
      return {
        ...existingClientTagCategory,
        name: clientTagCategoryData.name !== undefined ? clientTagCategoryData.name : existingClientTagCategory.name,
        color: clientTagCategoryData.color !== undefined ? clientTagCategoryData.color : existingClientTagCategory.color,
        classification: clientTagCategoryData.classification !== undefined ? clientTagCategoryData.classification : existingClientTagCategory.classification,
        vip: clientTagCategoryData.vip !== undefined ? clientTagCategoryData.vip : existingClientTagCategory.vip,
        display: clientTagCategoryData.display !== undefined ? clientTagCategoryData.display : existingClientTagCategory.display,
        followers: clientTagCategoryData.followers !== undefined ? clientTagCategoryData.followers : existingClientTagCategory.followers,
        createdAt: clientTagCategoryData.createdAt !== undefined ? clientTagCategoryData.createdAt : existingClientTagCategory.createdAt,
      };
    } else {
      const clientTagCategoryEntity: ClientTagCategoryEntity = {
        id: includeId ? (clientTagCategoryData._id ? clientTagCategoryData._id.toString() : undefined) : clientTagCategoryData._id.toString(),
        name: clientTagCategoryData.name,
        color: clientTagCategoryData.color,
        classification: clientTagCategoryData.classification,
        vip: clientTagCategoryData.vip,
        display: clientTagCategoryData.display,
        followers: clientTagCategoryData.followers,
        createdAt: clientTagCategoryData.createdAt,
      };
      return clientTagCategoryData;
    }
  }

  static toModel(clientTagCategory: ClientTagCategoryEntity): any {
    return {
      name: clientTagCategory.name,
      color: clientTagCategory.color,
      classification: clientTagCategory.classification,
      vip: clientTagCategory.vip,
      display: clientTagCategory.display,
      followers: clientTagCategory.followers,
      createdAt: clientTagCategory.createdAt,
    };
  }
}
