'use client'
import React, { Suspense, useLayoutEffect, useRef, useState } from 'react'
import { OrgChart } from 'd3-org-chart'
import * as d3 from 'd3'

export const OrgChartIFrame = (props, ref) => {
  const d3Container = useRef(null)
  let chart = null

  function addNode(node) {
    chart.addNode(node)
  }

  function expandAll() {
    chart.expandAll().render().fit()
  }
  function collapseAll() {
    chart.clearHighlighting().collapseAll().render().fit()
  }

  function highlightNodeToRoot(nodeId) {
    chart.clearHighlighting()
    try {
      chart.collapseAll().setUpToTheRootHighlighted(nodeId).render().fit()
    } catch (error) {
      return
    }
  }
  function zoomIn() {
    chart.zoomIn()
  }
  function zoomOut() {
    chart.zoomOut()
  }
  props.zoomIn(zoomIn)
  props.zoomOut(zoomOut)
  props.expandAll(expandAll)
  props.collapseAll(collapseAll)

  props.setUpToTheRootHighlighted(highlightNodeToRoot)

  props.setClick(addNode)

  // We need to manipulate DOM
  useLayoutEffect(() => {
    try {
      if (props.data && d3Container.current) {
        if (!chart) {
          chart = new OrgChart()
          chart.svgHeight(500)
        }
        chart
          .compact(false)
          .pagingStep((d) => 5)
          .minPagingVisibleNodes((d) => 3)
          .pagingButton((d, i, arr, state) => {
            const step = state.pagingStep(d.parent)
            const currentIndex = d.parent.data._pagingStep
            const diff = d.parent.data._directSubordinatesPaging - currentIndex
            const min = Math.min(diff, step)
            return `
                    <div style="margin-top:50px;">
                      <div class="text-sm flex items-center justify-center px-2 py-1 bg-primary rounded-md w-fit text-white font-medium">
                      <div>
                      </div><div  style="line-height:2"> Show next ${min} nodes </div></div>
                    </div>
                  `
          })
          .nodeHeight((d) => 85 + 25)
          .nodeWidth((d) => 220 + 2)
          .childrenMargin((d) => 50)
          .compactMarginBetween((d) => 35)
          .compactMarginPair((d) => 30)
          .neighbourMargin((a, b) => 20)
          .nodeUpdate(function () {
            d3.select(this).select('.node-rect').attr('stroke', 'none')
          })
          .linkUpdate(function (d, i, arr) {
            d3.select(this).attr('stroke', '#E4E2E9').attr('stroke-width', 1)
            if (d.data._upToTheRootHighlighted || d.data._highlighted) {
              // Change link color when highlighted
              d3.select(this).attr('stroke', '#08aefe').attr('stroke-width', 3)
            }
          })
          .nodeContent(function (d, i, arr, state) {
            const color = '#FFFFFF'
            const imageDiffVert = 25 + 2
            return `
                <a ${
                  props.isHyperLinked
                    ? `href="dashboard/profile/${d.data.href}"`
                    : 'href="#"'
                }>
                  <div style='width:${
                    d.width
                  } px;height:${d.height}px;padding-top:${imageDiffVert - 2}px;padding-left:1px;padding-right:1px'>
                          <div style="font-family: 'Inter', sans-serif;background-color:${color};  margin-left:-1px;width:${d.width - 2}px;height:${d.height - imageDiffVert}px;border-radius:10px;border: ${d.data._highlighted || d.data._upToTheRootHighlighted ? '3px solid #08aefe"' : '1px solid #E4E2E9"'} >
                              <div style="display:flex;justify-content:flex-end;margin-top:5px;margin-right:8px">#${
                                d.data.id
                              }</div>
                              <div style="background-color:${color};margin-top:${-imageDiffVert - 20}px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;" ></div>
                              <div style="margin-top:${
                                -imageDiffVert - 20
                              }px;">   <img src=" ${d.data.image}" style="margin-left:${20}px;border-radius:100px;width:40px;height:40px;" /></div>
                              <div style="font-size:15px;color:#08011E;margin-left:20px;margin-top:10px">  ${
                                d.data.displayName
                              } </div>
                              <div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> ${
                                d.data.position
                              } </div>
  
                          </div>
                      </div>
                  </a>
                  `
          })
          .container(d3Container.current)
          .data(props.data)
          .render()
      }
    } catch (error) {
      console.log(error)
    }
  }, [props.data, d3Container.current])

  return (
    <div>
      <div ref={d3Container} />
    </div>
  )
}
