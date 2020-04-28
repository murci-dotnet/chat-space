## usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false|
|email|integer|null: false, unique: true|
|password|integer|null: false|

### Association
- has_many :group
- has_many :message


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false|

### Association
- belongs_to :user
- has_many :message


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|user_id|integer|null: false|
|group_id|integer|null: false|
|body|str|null: false|
|image|str|null: false|

### Association
- belongs_to :group
- belongs_to :user


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user