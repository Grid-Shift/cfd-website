################################################################################
# Blog settings
################################################################################
activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  blog.prefix = "blog"
  blog.permalink = "{category}/{title}"
  # blog.sources = "posts/:year-:month-:day-:title.html"
  blog.sources = "{year}-{month}-{day}-{title}.html"
  blog.layout = "layouts/post"
  blog.default_extension = ".markdown"

  # Matcher for blog source files
  # blog.taglink = "tags/{tag}.html"
  # blog.summary_separator = /(READMORE)/
  # blog.summary_length = 250
  # blog.year_link = "{year}.html"
  # blog.month_link = "{year}/{month}.html"
  # blog.day_link = "{year}/{month}/{day}.html"

  # blog.tag_template = "tag.html"
  # blog.calendar_template = "calendar.html"

  # Enable pagination
  # blog.paginate = true
  # blog.per_page = 10
  # blog.page_link = "page/{num}"
end

################################################################################
# Page options, layouts, aliases and proxies
################################################################################

# Per-page layout changes:
#
# With no layout
page "/admin/index.html", layout: false
page "/admin/config.yml", layout: false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :pages do
#   page "/pages/*"
# end

# Proxy pages (http://middlemanapp.com/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false
page "/portfolio/*", layout: "portfolio"

################################################################################
# Helpers
################################################################################

# Methods defined in the helpers block are available in templates
helpers do
  def meta_title
    if current_page.data.meta_title
      return "#{current_page.data.meta_title} | #{t(:site_name)}"
    elsif current_page.data.title
      return "#{current_page.data.title} | #{t(:site_name)}"
    else
      return "#{t(:site_tagline)} | #{t(:site_name)}"
    end
  end

  def social_title
    if current_page.data.meta_title
      return current_page.data.meta_title
    elsif current_page.data.title
      return current_page.data.title
    else
      return t(:site_name)
    end
  end

  def meta_description
    if current_page.data.meta_description
      return current_page.data.meta_description
    elsif current_page.data.summary
      return current_page.data.summary
    else
      return t(:site_description)
    end
  end

  def cfd_page_classes()
    if current_page.data.body_class
      return "#{page_classes} #{current_page.data.body_class} #{yield_content(:body_classes)}"
    else
      return "#{page_classes} #{yield_content(:body_classes)}"
    end
  end

  def last_index?(array, index)
    index == array.length - 1
  end
end

################################################################################
# Plugins
################################################################################

# Directory structures, must be placed after blog
activate :directory_indexes
activate :livereload
activate :i18n

activate :external_pipeline do |config|
  config.name = :gulp
  config.command = build? ? 'yarn run assets:production' : 'yarn run assets:watch'
  config.source = '.tmp_assets'
  config.latency = 1
end

################################################################################
# Directory configurations
################################################################################

set :css_dir, 'assets/styles'
set :js_dir, 'assets/scripts'
set :images_dir, 'assets/images'
set :build_dir, '.build'

################################################################################
# Tasks
################################################################################

configure :build do
  activate :gzip
  activate :asset_hash
  activate :cache_buster
end
