module SubnavHelper
  def content_for_modals
    @content_for_modals ||= ''
  end

  def subnav(*tabs)
    render 'subnav', :tab_names => tabs
  end

  def modal(id, &block)
    content = capture(&block)
    result = render 'modal', :content => content, :id => id

    content_for_modals << result
  end
end

include SubnavHelper
include Nanoc3::Helpers::Rendering

