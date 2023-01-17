class Player
    attr_accessor :credits, :active

    def sub_credits(sub_creds)
        if sub_creds == 0
            raise StandardError
        end
        @credits = @credits - sub_creds
    end
end