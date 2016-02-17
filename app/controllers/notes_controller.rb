class NotesController < ApplicationController
  include Clearance::Controller

  # before_action :require_login
  skip_before_action :verify_authenticity_token

  # GET /v1/notes
  def index
    @notes = Note.all
    render json: @notes.to_json
  end

  # POST /v1/notes
  def create
    # @note = current_user.notes.build(note_params)
    @note = Note.new(note_params)
    @note.save!
    render json: @note
  end

  # PUT /v1/notes/:id
  def update
  end

  # DELETE /v1/notes/:id
  def destroy
  end

  private

    def note_params
      params.require(:note).permit(:category, :details, :text, :title)
    end

  # render json: params.to_json
end
