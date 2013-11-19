Analytics = AnalyticsRuby            # Alias for convenience
Analytics.init({
                   secret: 'zkun4kzq44p8ros2z7da',  # The secret for Kickin_it
                   on_error: Proc.new { |status, msg| print msg }  # Optional error handler
               })