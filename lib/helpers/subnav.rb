module SubnavHelper
  def subnav(*tabs)
    render 'subnav', :tab_names => tabs
  end

  def modal(id, &block)
    @item[:content_for_modals] ||= ''

    content = capture(&block)
    result = render 'modal', :content => content, :id => id

    item[:content_for_modals] << result
  end
end

include SubnavHelper
include Nanoc3::Helpers::Rendering

