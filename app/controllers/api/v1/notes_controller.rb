module Api::V1
  class NotesController < ApiController

    # GET /v1/notes
    def index
      render json: Note.all().to_json
    end

    # POST /v1/notes
    def create
    end

    # PUT /v1/notes/:id
    def update
    end

    # DELETE /v1/notes/:id
    def destroy
    end

    # render json: params.to_json
  end
end
