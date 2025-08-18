{
  "targets": [
    {
      "target_name": "lightningcss",
      "type": "none",
      "include_dirs": ["<!@(node -p \"require('nan').include\")"],
      "dependencies": ["<!(node -p \"require('nan').gyp\")"]
    }
  ]
}
