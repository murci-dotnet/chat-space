require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    context 'messageを保存できる場合' do
      it "bodyがあれば保存できる" do
        expect(build(:message, image: nil)).to be_valid
      end
  
      it "imageがあれば保存できる" do
        expect(build(:message, body: nil)).to be_valid
      end
  
      it "bodyとimageがあれば保存できる" do
        expect(build(:message)).to be_valid
      end  
    end

    context 'messageを保存できない場合' do
      it "bodyもimageも無いと保存できない" do
        message = build(:message, body: nil, image: nil)
        message.valid?
        expect(message.errors[:body]).to include("を入力してください")
      end
  
      it "group_idが無いと保存できない" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end
  
      it "user_idが無いと保存できない" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end  
    end
  end
end