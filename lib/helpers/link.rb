module NavHelper
  def nav(string, id, url=nil)
    url ||= "/#{id}/"

    link = %{<a href="#{url}">#{string}</a>}

    if @item[:id] == id
      "<li class='active'>#{link}</li>"
    else
      "<li>#{link}</li>"
    end
  end
end

include NavHelper
include Nanoc3::Helpers::Rendering
