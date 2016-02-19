class NotesController < ApplicationController
  include Clearance::Controller

  before_action :require_login
  before_action :set_note, only: [:update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /notes
  def index
    @notes = current_user.notes.all
    render json: @notes.to_json
  end

  # POST /notes
  def create
    @note = current_user.notes.build(note_params)
    if @note.save
      render json: @note
    else
      # render # error
    end
  end

  # PUT /notes/:id
  def update
    if @note.update(note_params)
      render json: @note
    else
      # render # error
    end
  end

  # DELETE /notes/:id
  def destroy
    if @note.destroy
      head :no_content
    else
      # render # error
    end
  end

  private

    def set_note
      @note = current_user.notes.find(params[:id])
    end

    def note_params
      params.require(:note).permit(:category, :details, :text, :title)
    end

  # render json: params.to_json
end
