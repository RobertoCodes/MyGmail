class Api::EmailsController < ApplicationController

  def new
  end

  def create
    @email = Email.new(email_params) #subject, recipient_email, body,
    @email.sender_id = current_user.id
    @email.email_type = "sent"
    @email.category_id = 1
    if @email.save
      render :show
    else
      render json: @email.errors.full_messages
    end
  end

  def index
    @emails = Email.all
    render :index
  end

  def show
    @email = Email.find(params[:id])
    @children = @email.children
    render :show
  end

  def destroy
  end

  def update
  end

  def edit
  end

  private

  def email_params
    params.require(:email).permit(:id, :subject, :body, :recipient_email, :sender_id,
      :parent_email_id, :email_type, :category_id, :starred, :trashed)
  end





end
