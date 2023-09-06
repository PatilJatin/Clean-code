// Express API request populate the Client Model
export class TagCategoryModel {
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

// Client Entity provided by Client Repository is converted to Express API Response
export class TagCategoryEntity {
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
export class TagCategoryMapper {
  static toEntity(
    tagCategoryData: any,
    includeId?: boolean,
    existingTagCategory?: TagCategoryEntity
  ): TagCategoryEntity {
    if (existingTagCategory != null) {
      return {
        ...existingTagCategory,
        name: tagCategoryData.name !== undefined ? tagCategoryData.name : existingTagCategory.name,
        color: tagCategoryData.color !== undefined ? tagCategoryData.color : existingTagCategory.color,
        classification: tagCategoryData.classification !== undefined ? tagCategoryData.classification : existingTagCategory.classification,
        vip: tagCategoryData.vip !== undefined ? tagCategoryData.vip : existingTagCategory.vip,
        display: tagCategoryData.display !== undefined ? tagCategoryData.display : existingTagCategory.display,
        followers: tagCategoryData.followers !== undefined ? tagCategoryData.followers : existingTagCategory.followers,
        createdAt: tagCategoryData.createdAt !== undefined ? tagCategoryData.createdAt : existingTagCategory.createdAt,
      };
    } else {
      const tagCategoryEntity: TagCategoryEntity = {
        id: includeId ? (tagCategoryData._id ? tagCategoryData._id.toString() : undefined) : tagCategoryData._id.toString() ,
        name: tagCategoryData.name,
        color: tagCategoryData.color,
        classification: tagCategoryData.classification,
        vip: tagCategoryData.vip,
        display: tagCategoryData.display,
        followers: tagCategoryData.followers,
        createdAt: tagCategoryData.createdAt,
      };
      return tagCategoryEntity;
    }
  }

  static toModel(tagCategory: TagCategoryEntity): any {
    return {
      name: tagCategory.name,
      color: tagCategory.color,
      classification: tagCategory.classification,
      vip: tagCategory.vip,
      display: tagCategory.display,
      followers: tagCategory.followers,
      createdAt: tagCategory.createdAt,
    };
  }
}
