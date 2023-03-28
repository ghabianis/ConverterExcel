const ERD = `Enum "socialinteraction_type_enum" {
    "like"
    "view"
    "share"
    "comment"
  }
  
  Table "media_community" {
    "media_id" int(11) [pk,not null]
    "community_id" int(11) [pk,not null]
    "created_at" timestamp [default: '0000-00-00 00:00:00']
    "updated_at" timestamp [default: '0000-00-00 00:00:00']
  }
  
  Table "communityPosts" {
    "id" int(11) [pk,not null]
    "content" int(11) [pk,not null]
    "condidate_id" int(11)
    "created_at" timestamp [default: '0000-00-00 00:00:00']
    "updated_at" timestamp [default: '0000-00-00 00:00:00']
  }
  
  Table "post_community" {
    "communitypost_id" int(11) [pk,not null]
    "community_id" int(11) [pk,not null]
    "created_at" timestamp [default: '0000-00-00 00:00:00']
    "updated_at" timestamp [default: '0000-00-00 00:00:00']
  }
  
  Table "mediaCategory" {
    "id" int(11) [pk,not null]
    "name" varchar(255)
    "created_at" timestamp [default: '0000-00-00 00:00:00']
    "updated_at" timestamp [default: '0000-00-00 00:00:00']
  }
  
  Table "survey" {
    "id" int(11) [pk,not null]
    "title"  varchar(255)
    "content" varchar(255)
    "enterprise_id" int(11)
    "created_at" timestamp [default: '0000-00-00 00:00:00']
    "updated_at" timestamp [default: '0000-00-00 00:00:00']
  }
  
  Table "video" {
    "id" int(11) [pk,not null]
    "title" varchar(255)
    "type" varchar(255)
    "duration" varchar(255)
    "description" varchar(255)
    "media_id" int(11)
    "enterprise_id" int(11)
    "created_at" timestamp [default: '0000-00-00 00:00:00']
    "updated_at" timestamp [default: '0000-00-00 00:00:00']
  }
  
  Ref:"user"."id" < "condidate"."user_id" [update: cascade, delete: cascade]
  
  Ref:"user"."id" < "comment"."user_id"
  
  Ref:"condidate"."id" < "contract"."condidate_id" [update: cascade, delete: cascade]
  
  Ref:"media"."id" < "event"."media_id"
  
  Ref:"condidate"."id" < "experience"."condidate_id" [update: cascade, delete: cascade]
  
  Ref:"condidate"."id" < "follow"."account_id" [update: cascade, delete: cascade]
  
  Ref:"condidate"."id" < "cours"."account_id"
  
  Ref:"user"."id" < "media"."user_id" [update: cascade, delete: cascade]
  
  Ref:"media"."id" < "post"."media_id"
  
  Ref:"question"."id" < "questiontype"."question_id" [update: cascade, delete: cascade]
  
  Ref:"media"."id" < "story"."media_id"
  
  Ref:"media"."id" < "video"."media_id"
  
  Ref: "media"."id" < "offer"."media_id"
  
  Ref: "contract"."id" < "offer"."contract_id"
  
  Ref: "entreprise"."id" < "follow_entreprise"."entreprise_id"
  
  Ref: "follow"."id" < "follow_entreprise"."follow_id"
  
  Ref: "user"."id" < "feedback"."user_id"
  
  Ref: "offer"."id" < "feedback"."offer_id"
  
  Ref: "community"."id" < "story"."community_id`

function parseERD(ERD) {
    const entities = [];
    const relationships = [];

    // Identify entities
    const entityElems = ERD.querySelectorAll('.entity');
    entityElems.forEach((entityElem) => {
        const entity = {
            name: entityElem.querySelector('.entity-name').textContent,
            attributes: [],
        };
        const attributeElems = entityElem.querySelectorAll('.attribute');
        attributeElems.forEach((attributeElem) => {
            entity.attributes.push({
                name: attributeElem.querySelector('.attribute-name').textContent,
                type: attributeElem.querySelector('.attribute-type').textContent,
            });
        });
        entities.push(entity);
    });

    // Identify relationships
    const relationshipElems = ERD.querySelectorAll('.relationship');
    relationshipElems.forEach((relationshipElem) => {
        const relationship = {
            type: relationshipElem.querySelector('.relationship-type').textContent,
            entities: [],
        };
        const entityElems = relationshipElem.querySelectorAll('.entity');
        entityElems.forEach((entityElem) => {
            relationship.entities.push({
                name: entityElem.querySelector('.entity-name').textContent,
                cardinality: entityElem.querySelector('.entity-cardinality').textContent,
            });
        });
        relationships.push(relationship);
    });

    return {
        entities,
        relationships,
    };
}